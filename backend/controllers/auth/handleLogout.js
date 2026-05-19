const handleLogout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: 'lax' });
        res.status(200).json({ error: false, message: "Logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: true, message: "Error logging out" });
    }
}

export { handleLogout }
