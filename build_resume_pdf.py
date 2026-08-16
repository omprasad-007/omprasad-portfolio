import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT

def create_detailed_resume():
    output_dir = os.path.join(os.getcwd(), 'assets', 'pdf')
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, 'Omprasad_Bhaskar_Padwalkar_Resume.pdf')

    # 36pt (0.5 inch) margins for a comprehensive 2-3 page layout
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    PRIMARY_COLOR = colors.HexColor('#2b6cb0')
    DARK_TEXT = colors.HexColor('#1a1a1a')
    SUB_TEXT = colors.HexColor('#4a5568')
    LINE_COLOR = colors.HexColor('#cbd5e0')

    # Typography Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=25,
        alignment=TA_CENTER,
        textColor=DARK_TEXT
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        alignment=TA_CENTER,
        textColor=PRIMARY_COLOR
    )

    inst_style = ParagraphStyle(
        'InstStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        alignment=TA_CENTER,
        textColor=SUB_TEXT
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=PRIMARY_COLOR
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=PRIMARY_COLOR,
        spaceBefore=12,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_JUSTIFY,
        textColor=DARK_TEXT
    )

    left_bold = ParagraphStyle(
        'LeftBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=DARK_TEXT
    )

    right_tag = ParagraphStyle(
        'RightTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        alignment=TA_RIGHT,
        textColor=PRIMARY_COLOR
    )

    sub_inst = ParagraphStyle(
        'SubInst',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=12.5,
        textColor=SUB_TEXT
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3,
        textColor=DARK_TEXT
    )

    story = []

    # ==================== HEADER ====================
    story.append(Paragraph("OMPRASAD BHASKAR PADWALKAR", name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("2nd-Year Data Science Student & AI Developer", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("D Y Patil College of Engineering, Kolhapur, Maharashtra", inst_style))
    story.append(Spacer(1, 5))
    
    contact_text = (
        "Email: omprasadpadwalkar007@gmail.com &nbsp;|&nbsp; Phone: +91 9405856488 &nbsp;|&nbsp; Location: Kolhapur, MH, India<br/>"
        "LinkedIn: linkedin.com/in/omprasad-bhaskar-padwalkar-824224394 &nbsp;|&nbsp; GitHub: github.com/omprasad-007"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))

    def add_section_header(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=1.2, color=PRIMARY_COLOR, spaceBefore=2, spaceAfter=6))

    # ==================== 1. PROFESSIONAL SUMMARY ====================
    add_section_header("Professional Summary")
    summary_text = (
        "Highly motivated and results-driven 2nd-Year Engineering Student specializing in <b>Data Science, Machine Learning, "
        "and Artificial Intelligence</b> at D Y Patil College of Engineering, Kolhapur. Possesses a strong foundational understanding "
        "of statistical modeling, predictive analytics, computer vision pipelines, data structures, and full-stack web software engineering. "
        "Demonstrated technical expertise through the end-to-end development of real-world AI applications including financial transaction fraud "
        "detection systems, agricultural crop disease diagnosis models, and market analytics web solutions. Committed to leveraging data science "
        "methodologies and clean software engineering practices to solve complex real-world challenges."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # ==================== 2. EDUCATION & ACADEMIC HIGHLIGHTS ====================
    add_section_header("Education & Academic Background")
    
    t1 = Paragraph("<b>Bachelor of Engineering (B.E.) in Data Science</b>", left_bold)
    t2 = Paragraph("<b>2024 &ndash; Present (2nd Year)</b>", right_tag)
    table = Table([[t1, t2]], colWidths=[370, 145])
    table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table)
    story.append(Paragraph("D Y Patil College of Engineering, Kolhapur, Maharashtra (Affiliated to Shivaji University)", sub_inst))
    story.append(Spacer(1, 4))
    
    edu_bullets = [
        "<b>Core Specialization:</b> Data Science Foundations, Artificial Intelligence, Machine Learning, Computer Vision, and Predictive Analytics.",
        "<b>Key Coursework:</b> Data Structures & Algorithms (C/C++), Database Management Systems (SQL), Python Programming, Web Technologies, Applied Mathematics & Statistics.",
        "<b>Academic Leadership:</b> Active member of departmental technical committees, leading peer learning sessions on Python programming, machine learning basics, and version control."
    ]
    for eb in edu_bullets:
        story.append(Paragraph(f"&bull; {eb}", bullet_style))
    story.append(Spacer(1, 6))

    # ==================== 3. DETAILED TECHNICAL SKILLS ====================
    add_section_header("Technical Skills & Core Competencies")
    skills = [
        "<b>Programming Languages:</b> Python (Advanced), C, C++, JavaScript (ES6+), SQL, HTML5, CSS3",
        "<b>Data Science & Machine Learning:</b> NumPy, Pandas, Scikit-Learn, OpenCV, Data Preprocessing, Feature Engineering, Anomaly Detection, Supervised & Unsupervised Learning",
        "<b>Web Development & Frameworks:</b> HTML5, CSS3, JavaScript, Responsive Layout Design, RESTful APIs, AJAX, Swiper.js, Web3Forms, FormSubmit",
        "<b>Developer Tools & Platforms:</b> Git, GitHub, VS Code, Linux Shell, Jupyter Notebooks, Google Colab",
        "<b>Software Engineering Practices:</b> Content Security Policy (CSP) Hardening, Input Validation, Rate Limiting, Base64 Data Obfuscation, Dynamic PDF Generation",
        "<b>Soft Skills & Professional Leadership:</b> Analytical Problem Solving, Strategic Team Leadership, Technical Documentation, Public Speaking, Interpersonal Communication"
    ]
    for s in skills:
        story.append(Paragraph(f"&bull; {s}", bullet_style))
    story.append(Spacer(1, 6))

    # ==================== 4. KEY FEATURED PROJECTS ====================
    add_section_header("Key Featured Projects & Practical Experience")

    projects = [
        {
            "title": "SecurePay AI &mdash; Intelligent Payment Security Framework",
            "tag": "AI / FinTech Security",
            "points": [
                "<b>Project Overview:</b> Developed an intelligent financial payment security application designed to detect and prevent transaction fraud in real time.",
                "<b>Technical Architecture:</b> Implemented machine learning anomaly detection models using Python and Scikit-Learn to evaluate transaction metadata and flag suspicious behavior.",
                "<b>Key Impact:</b> Established real-time risk scoring metrics, user validation workflows, and automated threat mitigation to protect digital transaction integrity."
            ]
        },
        {
            "title": "AgroScan AI &mdash; Agricultural Crop Disease Diagnostic System",
            "tag": "Computer Vision / AgriTech",
            "points": [
                "<b>Project Overview:</b> Engineered a Computer Vision image diagnostic pipeline capable of identifying plant leaf diseases to assist farmers in early treatment.",
                "<b>Technical Architecture:</b> Utilized OpenCV for image pre-processing, contrast enhancement, color segmentation, and visual feature extraction from crop leaf images.",
                "<b>Key Impact:</b> Empowered local agricultural communities with rapid diagnostic feedback, actionable treatment recommendations, and yield preservation insights."
            ]
        },
        {
            "title": "KrishiSetu &mdash; Bridge for Farmers (Data Analytics Platform)",
            "tag": "Data Analytics / Full-Stack Web",
            "points": [
                "<b>Project Overview:</b> Built a comprehensive agricultural data analytics platform connecting farmers directly with transparent market pricing and buyer networks.",
                "<b>Technical Architecture:</b> Integrated market price analytics, regional crop data aggregation, dynamic UI visualization, and responsive mobile-first architecture.",
                "<b>Key Impact:</b> Eliminated middleman exploitation by providing real-time price trend forecasting and direct buyer connectivity for agricultural producers."
            ]
        },
        {
            "title": "80th Independence Day Wishes Platform",
            "tag": "Interactive Web Solution",
            "points": [
                "<b>Project Overview:</b> Created an engaging web application for generating personalized national celebration greetings with dynamic multimedia components.",
                "<b>Technical Architecture:</b> Developed custom greeting generation engines, background audio controls, keyframe CSS animations, and social share links.",
                "<b>Key Impact:</b> Achieved widespread user engagement through seamless social sharing capabilities and responsive design across all mobile and desktop devices."
            ]
        },
        {
            "title": "Personal Developer & Data Science Portfolio",
            "tag": "Full-Stack Web Engineering",
            "points": [
                "<b>Project Overview:</b> Architected and deployed a futuristic, highly responsive personal developer portfolio featuring automated GitHub project synchronization.",
                "<b>Technical Architecture:</b> Implemented strict Content Security Policy (CSP) meta headers, rate-limiting anti-spam controls, confidential contact form integration, and vector PDF resume export.",
                "<b>Key Impact:</b> Maintained 100% production uptime, optimized SEO indexing for search visibility, and ensured bulletproof security against cross-site scripting."
            ]
        }
    ]

    for p in projects:
        p1 = Paragraph(f"<b>{p['title']}</b>", left_bold)
        p2 = Paragraph(f"<b>{p['tag']}</b>", right_tag)
        ptable = Table([[p1, p2]], colWidths=[360, 155])
        ptable.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(ptable)
        story.append(Spacer(1, 2))
        for pt in p['points']:
            story.append(Paragraph(f"&bull; {pt}", bullet_style))
        story.append(Spacer(1, 4))

    # ==================== 5. CERTIFICATIONS & PROFESSIONAL TRAINING ====================
    add_section_header("Certifications, Hackathons & Professional Achievements")
    certs = [
        "<b>Hack2Skills Innovation & Hackathon Certificate:</b> Honored for rapid technological prototyping, cross-functional collaboration, and innovative solution design under competitive time constraints.",
        "<b>Python for Data Science Certification:</b> Completed comprehensive certification covering numerical computing with NumPy, data manipulation with Pandas, data visualization, and ML model building.",
        "<b>Soft Skills & Communication Training (Level 1):</b> Certified in effective workplace communication, technical presentation techniques, teamwork dynamics, and professional etiquette.",
        "<b>Advanced Soft Skills & Leadership Mastery (Level 2):</b> Awarded advanced credential in corporate readiness, team management, strategic decision-making, and emotional intelligence.",
        "<b>Technical Skill Development & Engineering Excellence:</b> Standardized assessment credential recognizing engineering problem-solving capabilities and project execution."
    ]
    for c in certs:
        story.append(Paragraph(f"&bull; {c}", bullet_style))
    story.append(Spacer(1, 6))

    # ==================== 6. EXTRA-CURRICULAR & LEADERSHIP ====================
    add_section_header("Leadership, Mentorship & Extra-Curricular Activities")
    leadership_items = [
        "<b>Technical Peer Mentor:</b> Conducted introductory sessions for junior engineering students on Python programming, version control with Git/GitHub, and data science fundamentals.",
        "<b>Event Coordinator:</b> Actively organized and coordinated technical events, coding competitions, and Data Science workshops at D Y Patil College of Engineering, Kolhapur.",
        "<b>Continuous Learning:</b> Passionate about exploring cutting-edge AI advancements, Large Language Models (LLMs), Computer Vision research, and open-source software contribution."
    ]
    for li in leadership_items:
        story.append(Paragraph(f"&bull; {li}", bullet_style))

    doc.build(story)
    print("Detailed 2-3 Page PDF generated successfully at:", pdf_path)

if __name__ == '__main__':
    create_detailed_resume()
