import streamlit as str
import streamlit.components.v1 as components

# Configuration de la page Streamlit
st.set_page_color = "light"
st.set_page_config(page_title="AgroTech Africa", page_icon="🌍", layout="wide")

# Lecture du fichier HTML de votre maquette
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Affichage de la maquette HTML dans Streamlit
components.html(html_content, height=1200, scroller=True)