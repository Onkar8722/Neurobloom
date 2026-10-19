"""
NeuroBloom Backend Server
Main entry point for the Flask application
"""

import os
from importlib import import_module

from app import create_app

# Load environment variables
try:
    load_dotenv = import_module('dotenv').load_dotenv
except ModuleNotFoundError:
    load_dotenv = None

if load_dotenv:
    load_dotenv()

# Create Flask app
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    app.run(host='0.0.0.0', port=port, debug=debug)
