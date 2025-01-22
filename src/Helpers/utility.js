
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const isDropdownSelected = (value) => value !== "";

export const isNotEmpty = (value) => value.trim() !== "";

export function GetUserDetails() {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
        try {
            return JSON.parse(loginData);
        } catch (error) {
            console.error("Error parsing login data:", error);
            return null;
        }
    }
    return null;
}

export function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const invalidPattern = /[.]{2,}|[.-]{2,}|[@]{2,}/; // Invalid patterns to check against
    return emailPattern.test(email) && !invalidPattern.test(email);
}

export function isValidName(name) {
    const trimmedUsername = name.trim();
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~ -]{3,}$/;
    return usernameRegex.test(trimmedUsername);
}

export function isValidPhoneNumber(phoneNumber) {
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    const canadianPhoneRegex = /^(\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    return (
        indianPhoneRegex.test(phoneNumber) || canadianPhoneRegex.test(phoneNumber)
    );
}

export function hasSpecialCharacter(password) {
    const specialCharRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return specialCharRegex.test(password);
}

export function LoaderShow() {
    var element = document.getElementById("hideloding");
    if (element !== null) {
        element.style.display = "flex";
    }
}

export function LoaderHide() {
    var element = document.getElementById("hideloding");

    if (element !== null) {
        element.style.display = "none";
    }
}

export function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://nexapp.co.in/">
                NexApp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function Logout() {

    localStorage.removeItem("loginData")

    // localStorage.setItem("NavigationID", "")
    // window.location.href = CommonConstants.LoginPage;

    // history.push('/');
}
