from flask import Flask, render_template
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

@app.route('/')
def home():
    # Pass the Cesium Ion token to the template
    return render_template('index.html', cesium_token=os.getenv('CESIUM_ION_TOKEN'))

if __name__ == '__main__':
    app.run(debug=True)