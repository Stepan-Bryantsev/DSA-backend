export const register = async (req, res) => {
    try {
        res.json({
            userData: "123",
            token: "qwe"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
//# sourceMappingURL=UserController.js.map