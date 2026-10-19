"""
Text-to-Speech and Speech-to-Text integration
Uses Google Cloud APIs
"""

import os
from google.cloud import speech_v1
from google.cloud import texttospeech_v1
import io


class SpeechToTextConverter:
    """Convert speech audio to text"""
    
    def __init__(self, credentials_path=None):
        if credentials_path:
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path
        self.client = speech_v1.SpeechClient()
    
    def transcribe_audio(self, audio_file_path, language_code='en-US'):
        """
        Transcribe audio file to text
        
        Args:
        - audio_file_path: path to audio file (WAV, MP3, etc.)
        - language_code: language code (e.g., 'en-US')
        
        Returns:
        - transcript: transcribed text
        - confidence: confidence score
        """
        with open(audio_file_path, 'rb') as audio_file:
            content = audio_file.read()
        
        audio = speech_v1.RecognitionAudio(content=content)
        config = speech_v1.RecognitionConfig(
            encoding=speech_v1.RecognitionConfig.AudioEncoding.LINEAR16,
            language_code=language_code,
        )
        
        response = self.client.recognize(config=config, audio=audio)
        
        if not response.results:
            return '', 0.0
        
        transcript = ''
        confidence = 0.0
        
        for result in response.results:
            if result.alternatives:
                transcript += result.alternatives[0].transcript + ' '
                confidence = result.alternatives[0].confidence
        
        return transcript.strip(), confidence


class TextToSpeechConverter:
    """Convert text to speech"""
    
    def __init__(self, credentials_path=None):
        if credentials_path:
            os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credentials_path
        self.client = texttospeech_v1.TextToSpeechClient()
    
    def synthesize_speech(self, text, language_code='en-US', voice_gender='FEMALE', 
                         output_file=None):
        """
        Convert text to speech
        
        Args:
        - text: text to convert
        - language_code: language code (e.g., 'en-US')
        - voice_gender: 'MALE' or 'FEMALE'
        - output_file: path to save audio file (optional)
        
        Returns:
        - audio_content: audio file content (bytes)
        - audio_file_path: path to saved file (if output_file provided)
        """
        synthesis_input = texttospeech_v1.SynthesisInput(text=text)
        
        # Build voice selector
        voice = texttospeech_v1.VoiceSelectionParams(
            language_code=language_code,
            ssml_gender=texttospeech_v1.SsmlVoiceGender[voice_gender]
        )
        
        # Select audio encoding
        audio_config = texttospeech_v1.AudioConfig(
            audio_encoding=texttospeech_v1.AudioEncoding.MP3
        )
        
        # Perform TTS
        response = self.client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )
        
        # Save audio to file if path provided
        if output_file:
            with open(output_file, 'wb') as out:
                out.write(response.audio_content)
            return response.audio_content, output_file
        
        return response.audio_content, None


class OfflineTTSConverter:
    """Offline Text-to-Speech using pyttsx3 (fallback when Google Cloud unavailable)"""
    
    def __init__(self):
        try:
            import pyttsx3
            self.engine = pyttsx3.init()
            self.engine.setProperty('rate', 150)  # Speed of speech
            self.available = True
        except ImportError:
            self.available = False
            print("pyttsx3 not installed. Install with: pip install pyttsx3")
    
    def synthesize_speech(self, text, output_file=None):
        """
        Convert text to speech offline
        
        Args:
        - text: text to convert
        - output_file: path to save audio file
        
        Returns:
        - success: whether synthesis was successful
        """
        if not self.available:
            return False
        
        try:
            if output_file:
                self.engine.save_to_file(text, output_file)
            else:
                self.engine.say(text)
            
            self.engine.runAndWait()
            return True
        except Exception as e:
            print(f"Error in speech synthesis: {e}")
            return False
