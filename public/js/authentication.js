// Lưu trữ token vào localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Lấy giá trị token từ localStorage
function getToken() {
    return localStorage.getItem('token');
}

module.exports = { saveToken, getToken };