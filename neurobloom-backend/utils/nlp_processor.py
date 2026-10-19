import re
from collections import Counter
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import words as nltk_words

# Download required NLTK data (run once)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/words')
except LookupError:
    nltk.download('words')


def process_text(text):
    """
    Process and analyze text for reading assessment
    
    Returns:
    - processed_text: cleaned text
    - word_count: number of words
    - reading_level: estimated reading level
    """
    # Clean text
    processed_text = text.lower().strip()
    
    # Tokenize
    words = word_tokenize(processed_text)
    word_count = len(words)
    
    # Calculate reading metrics
    sentences = re.split(r'[.!?]+', processed_text)
    sentences = [s.strip() for s in sentences if s.strip()]
    sentence_count = len(sentences)
    
    avg_word_length = sum(len(w) for w in words) / word_count if word_count > 0 else 0
    avg_words_per_sentence = word_count / sentence_count if sentence_count > 0 else 0
    
    # Estimate Flesch-Kincaid reading level
    flesch_score = calculate_flesch_kincaid(word_count, sentence_count, avg_word_length)
    
    return {
        'processed_text': processed_text,
        'word_count': word_count,
        'sentence_count': sentence_count,
        'avg_word_length': avg_word_length,
        'avg_words_per_sentence': avg_words_per_sentence,
        'reading_level': flesch_score
    }


def analyze_writing(text):
    """
    Analyze writing for errors and quality
    
    Returns:
    - spelling_errors: list of spelling errors
    - grammatical_errors: list of grammatical errors
    """
    spelling_errors = []
    grammatical_errors = []
    
    words = word_tokenize(text.lower())
    english_words = set(nltk_words.words())
    
    # Check for spelling errors
    for word in words:
        # Remove punctuation
        clean_word = re.sub(r'[^\w]', '', word)
        if clean_word and len(clean_word) > 2:  # Ignore very short words
            if clean_word not in english_words:
                spelling_errors.append(clean_word)
    
    # Check for common grammatical issues
    # (Simplified rules - in production, use spaCy or NLTK POS tagging)
    
    # Check for multiple spaces
    if '  ' in text:
        grammatical_errors.append('Multiple consecutive spaces')
    
    # Check for missing spaces after punctuation
    if re.search(r'[.!?][a-z]', text):
        grammatical_errors.append('Missing space after punctuation')
    
    # Check for capitalization issues
    sentences = re.split(r'[.!?]+', text)
    for sentence in sentences:
        stripped = sentence.strip()
        if stripped and stripped[0].islower():
            grammatical_errors.append('Sentence does not start with capital letter')
            break
    
    return {
        'spelling_errors': list(set(spelling_errors)),  # Remove duplicates
        'spelling_error_count': len(set(spelling_errors)),
        'grammatical_errors': grammatical_errors,
        'grammatical_error_count': len(grammatical_errors)
    }, {
        'spelling_errors': list(set(spelling_errors)),
        'grammatical_errors': grammatical_errors
    }


def calculate_flesch_kincaid(word_count, sentence_count, avg_word_length):
    """
    Calculate Flesch-Kincaid reading level
    Formula: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    """
    if word_count == 0 or sentence_count == 0:
        return 0
    
    # Simplified syllable estimation (use word length as proxy)
    estimated_syllables = word_count * (avg_word_length / 4)  # Average ~4 chars per syllable
    
    grade_level = (0.39 * (word_count / sentence_count) + 
                   11.8 * (estimated_syllables / word_count) - 
                   15.59)
    
    return max(0, min(grade_level, 18))  # Clamp between 0 and 18


def extract_phonetic_errors(text):
    """Extract phonetic errors for dyslexia detection"""
    common_phonetic_substitutions = {
        'b': 'd', 'd': 'b',
        'p': 'q', 'q': 'p',
        'n': 'm', 'm': 'n',
        'u': 'v', 'v': 'u'
    }
    
    errors = []
    words = text.lower().split()
    
    for word in words:
        for i, char in enumerate(word):
            if char in common_phonetic_substitutions:
                # Check if the character is commonly confused
                errors.append({
                    'word': word,
                    'error_type': 'phonetic_confusion',
                    'char': char,
                    'position': i
                })
    
    return errors


def calculate_reading_speed(text, time_seconds):
    """
    Calculate reading speed in words per minute
    
    Args:
    - text: the text that was read
    - time_seconds: time taken to read (in seconds)
    
    Returns:
    - reading_speed: words per minute
    """
    word_count = len(text.split())
    time_minutes = time_seconds / 60
    
    if time_minutes == 0:
        return 0
    
    reading_speed = word_count / time_minutes
    return reading_speed


def assess_comprehension(text, answers):
    """
    Assess reading comprehension based on answers
    
    Args:
    - text: original text
    - answers: list of comprehension question answers
    
    Returns:
    - comprehension_score: 0-100
    """
    if not answers:
        return 0
    
    correct_count = sum(1 for a in answers if a.get('is_correct', False))
    comprehension_score = (correct_count / len(answers)) * 100
    
    return comprehension_score
