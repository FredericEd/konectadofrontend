export const login = async (correo, clave, callback) => {
    const queryString = require('query-string');
    const response = await fetch('https://api-dot-konectado-app.appspot.com/auth_admin/login', {
        method: 'POST',
        headers: new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body: queryString.stringify({email: correo, password: clave}),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
        sessionStorage.setItem("token", json.data.access_token);
        sessionStorage.setItem("refreshToken", json.data.refresh_token);
    }
    callback(response.ok, json);
}

export const logout = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('https://api-dot-konectado-app.appspot.com/auth_admin/logout', {
            method: 'POST',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => logout(callback));
        } else {
            const json = await response.json();
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
            callback();
            return;
        }
    }
}

export const refreshToken = async callback => {
    const token = sessionStorage.getItem("refreshToken");
    if (token) {
        const response = await fetch('https://api-dot-konectado-app.appspot.com/auth_admin/token_refresh', {
            method: 'POST',
            headers: new Headers(
                {'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer ' + token}),
        });
        const json = await response.json();
        if (response.ok) {
            sessionStorage.setItem("token", json.data.access_token);
            callback();
            return;
        }
    }
}