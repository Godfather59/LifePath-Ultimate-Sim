// Theme definitions with CSS variable mappings
export const THEMES = {
    light: {
        name: 'Light Mode',
        icon: '☀️',
        colors: {
            '--bg-deep': '#f0f2f5',
            '--bg-surface': '#ffffff',
            '--bg-gradient': 'linear-gradient(135deg, #e0e0e0, #f5f5f5, #ffffff)',
            '--glass-bg': 'rgba(0, 0, 0, 0.05)',
            '--glass-border': 'rgba(0, 0, 0, 0.1)',
            '--accent-primary': '#1e88e5',
            '--accent-secondary': '#42a5f5',
            '--text-primary': '#1a1a1a',
            '--text-secondary': '#4a4a4a',
            '--text-muted': '#7a7a7a'
        }
    },
    dark: {
        name: 'Dark Mode',
        icon: '🌙',
        colors: {
            '--bg-deep': '#0a0a12',
            '--bg-surface': '#161622',
            '--bg-gradient': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            '--glass-bg': 'rgba(255, 255, 255, 0.06)',
            '--glass-border': 'rgba(255, 255, 255, 0.08)',
            '--accent-primary': '#7000ff',
            '--accent-secondary': '#ae00ff',
            '--text-primary': '#ffffff',
            '--text-secondary': '#a0a0b0',
            '--text-muted': '#666677'
        }
    }
};

export function applyTheme(themeName) {
    const theme = THEMES[themeName] || THEMES.dark;
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Save preference
    localStorage.setItem('bitlife_theme', themeName);
}

export function getStoredTheme() {
    return localStorage.getItem('bitlife_theme') || 'dark';
}

export function getThemesList() {
    return Object.keys(THEMES).map(key => ({
        id: key,
        ...THEMES[key]
    }));
}
