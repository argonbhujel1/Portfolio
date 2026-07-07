from flask import Flask, render_template, request, jsonify, send_file
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'argan_bhujel_portfolio_secret_2024'

# Database initialization
def init_db():
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS contacts
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  email TEXT NOT NULL,
                  phone TEXT,
                  subject TEXT,
                  message TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS projects
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  description TEXT,
                  technologies TEXT,
                  demo_url TEXT,
                  github_url TEXT,
                  category TEXT)''')
    
    # Insert sample projects if empty
    c.execute('SELECT COUNT(*) FROM projects')
    if c.fetchone()[0] == 0:
        projects = [
            ('Personal Portfolio', 'Premium responsive portfolio website with dark mode and glassmorphism', 'HTML,CSS,JavaScript,Flask', '#', '#', 'Web Design'),
            ('Restaurant Website', 'Elegant restaurant website with online ordering system', 'HTML,CSS,JavaScript,Python', '#', '#', 'Web Design'),
            ('Hotel Booking System', 'Luxury hotel website with room booking functionality', 'HTML,CSS,Flask,SQLite', '#', '#', 'Web Application'),
            ('ISP Dashboard', 'Internet Service Provider management dashboard', 'Python,Flask,SQLite', '#', '#', 'Web Application'),
            ('Python Billing System', 'Automated billing and invoice generation system', 'Python,SQLite', '#', '#', 'Python Automation'),
            ('Attendance System', 'Employee attendance tracking with face recognition', 'Python,OpenCV,SQLite', '#', '#', 'Python Automation'),
            ('QR Code Generator', 'Dynamic QR code generator with customization options', 'Python,Flask', '#', '#', 'Python Tool'),
            ('Weather Website', 'Real-time weather dashboard with API integration', 'HTML,CSS,JavaScript,API', '#', '#', 'Web Application')
        ]
        c.executemany('INSERT INTO projects (title, description, technologies, demo_url, github_url, category) VALUES (?,?,?,?,?,?)', projects)
    
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    c.execute('SELECT * FROM projects')
    projects = [{'id': row[0], 'title': row[1], 'description': row[2], 
                 'technologies': row[3], 'demo_url': row[4], 
                 'github_url': row[5], 'category': row[6]} for row in c.fetchall()]
    conn.close()
    return jsonify(projects)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    c.execute('INSERT INTO contacts (name, email, phone, subject, message) VALUES (?,?,?,?,?)',
              (data['name'], data['email'], data.get('phone', ''), 
               data.get('subject', ''), data['message']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Message sent successfully!'})

@app.route('/download-resume')
def download_resume():
    # In production, you'd serve an actual PDF file
    return jsonify({'message': 'Resume download functionality'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)