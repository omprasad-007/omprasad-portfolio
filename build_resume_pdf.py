import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT

def create_resume():
    output_dir = os.path.join(os.getcwd(), 'assets', 'pdf')
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, 'Omprasad_Bhaskar_Padwalkar_Resume.pdf')

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY_COLOR = colors.HexColor('#2b6cb0')
    DARK_TEXT = colors.HexColor('#1a1a1a')
    SUB_TEXT = colors.HexColor('#4a5568')

    # Typography Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=DARK_TEXT
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        alignment=TA_CENTER,
        textColor=PRIMARY_COLOR
    )

    inst_style = ParagraphStyle(
        'InstStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=SUB_TEXT
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=PRIMARY_COLOR
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=PRIMARY_COLOR,
        spaceBefore=8,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11.5,
        alignment=TA_JUSTIFY,
        textColor=DARK_TEXT
    )

    left_bold = ParagraphStyle(
        'LeftBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11,
        textColor=DARK_TEXT
    )

    right_tag = ParagraphStyle(
        'RightTag',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        alignment=TA_RIGHT,
        textColor=SUB_TEXT
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2,
        textColor=DARK_TEXT
    )

    story = []

    # Header
    story.append(Paragraph("OMPRASAD BHASKAR PADWALKAR", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("2nd-Year Data Science Student & AI Developer", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("D Y Patil College of Engineering, Kolhapur, Maharashtra", inst_style))
    story.append(Spacer(1, 4))
    
    contact_text = (
        "omprasadpadwalkar007@gmail.com | +91 9405856488 | Kolhapur, MH, India<br/>"
        "linkedin.com/in/omprasad-bhaskar-padwalkar-824224394 | github.com/omprasad-007"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))

    def add_section_header(title):
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.8, color=PRIMARY_COLOR, spaceBefore=1, spaceAfter=4))

    # 1. Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "Results-driven 2nd-Year Engineering Student specializing in Data Science, Machine Learning, and "
        "Artificial Intelligence at D Y Patil College of Engineering, Kolhapur. Hands-on experience in engineering "
        "Computer Vision models, AI payment fraud detection systems, agricultural data analytics solutions, and responsive "
        "full-stack web applications. Proficient in Python, C/C++, Data Structures, ML algorithms, and Web Technologies."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 2. Education
    add_section_header("Education")
    t1 = Paragraph("<b>Bachelor of Engineering (B.E.) in Data Science</b>", left_bold)
    t2 = Paragraph("<b>2024 &ndash; Present (2nd Year)</b>", right_tag)
    table = Table([[t1, t2]], colWidths=[380, 140])
    table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table)
    story.append(Paragraph("<i>D Y Patil College of Engineering, Kolhapur, Maharashtra</i>", inst_style))
    story.append(Spacer(1, 2))
    coursework = "<b>Relevant Coursework:</b> Data Science Foundations, Artificial Intelligence, Machine Learning, Python Programming, C & C++ Data Structures, Database Systems, Computer Vision, Web Technologies."
    story.append(Paragraph(coursework, bullet_style))
    story.append(Spacer(1, 4))

    # 3. Technical Skills
    add_section_header("Technical Skills")
    skills = [
        "<b>Programming Languages:</b> Python, C, C++, JavaScript, SQL, HTML5, CSS3",
        "<b>Data Science & AI:</b> NumPy, Pandas, Scikit-Learn, OpenCV, Data Preprocessing, Machine Learning Pipelines, Anomaly Detection",
        "<b>Tools & Frameworks:</b> Git, GitHub, VS Code, REST APIs, Swiper.js, Feather Icons, Responsive Web Architecture",
        "<b>Soft Skills & Leadership:</b> Strategic Problem Solving, Team Leadership, Emotional Intelligence, Communication"
    ]
    for s in skills:
        story.append(Paragraph(f"&bull; {s}", bullet_style))
    story.append(Spacer(1, 4))

    # 4. Key Featured Projects
    add_section_header("Key Featured Projects")

    projects = [
        ("SecurePay AI &mdash; Intelligent Payment Security System", "AI / FinTech",
         "Engineered an AI-powered payment security framework implementing real-time anomaly detection algorithms to prevent financial transaction fraud."),
        ("AgroScan AI &mdash; Agricultural Crop Disease Detection", "Computer Vision / AgriTech",
         "Developed a Computer Vision diagnostic pipeline analyzing crop leaf images for early disease detection, optimizing treatment and crop yield."),
        ("KrishiSetu &mdash; Bridge for Farmers", "Data Analytics / Web App",
         "Architected a smart agricultural analytics web platform providing farmers with real-time market insights, price analytics, and resource access."),
        ("80th Independence Day Wishes Platform", "Interactive Web App",
         "Created an interactive web application featuring customized greetings, dynamic audio playback, and animated wish generation."),
        ("Personal Developer & Data Science Portfolio", "Full-Stack Web App",
         "Built a responsive developer portfolio application featuring automated GitHub project sync, security hardening, and dynamic PDF resume export.")
    ]

    for p_title, p_tag, p_desc in projects:
        p1 = Paragraph(f"<b>{p_title}</b>", left_bold)
        p2 = Paragraph(f"<i>{p_tag}</i>", right_tag)
        ptable = Table([[p1, p2]], colWidths=[380, 140])
        ptable.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(ptable)
        story.append(Paragraph(f"&bull; {p_desc}", bullet_style))
        story.append(Spacer(1, 2))

    story.append(Spacer(1, 2))

    # 5. Certifications & Achievements
    add_section_header("Certifications & Achievements")
    certs = [
        "<b>Hack2Skills Innovation & Hackathon Certificate:</b> Recognized for rapid prototyping and innovative technological solution design.",
        "<b>Python for Data Science Certification:</b> Specialized credential in numerical computing, data manipulation, and machine learning models.",
        "<b>Soft Skills & Communication Training (Level 1):</b> Certified in effective communication, presentation, and workplace etiquette.",
        "<b>Advanced Soft Skills & Leadership Mastery (Level 2):</b> Advanced certification in corporate readiness, team leadership, and emotional intelligence.",
        "<b>Technical Skill Development & Engineering Excellence:</b> Assessment credential in technical engineering competencies and project execution."
    ]
    for c in certs:
        story.append(Paragraph(f"&bull; {c}", bullet_style))

    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == '__main__':
    create_resume()
