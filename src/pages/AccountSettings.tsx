import{ useState } from "react";
import "./styles/AccountSettings.css";

const AccountSettings = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage("Error changing password: " + errorData.message);
                setSuccessMessage("");
            } else {
                setSuccessMessage("Password changed successfully!");
                setErrorMessage("");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="account-settings">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default AccountSettings;

