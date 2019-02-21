import {refreshToken} from './authActions';

export const getStores = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getStores(callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveStore = async (store_id, name, description, image_file, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image_file', image_file);

        const response = await fetch('http://34.73.113.72/stores' + (store_id ? ("/" + store_id) : ""), {
            method: store_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveStore(store_id, name, description, image_file, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteStore = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteStore(store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getLocales = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/locals", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getLocales(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveLocal = async (local_id, name, address, email, phone, city_id, latitude, longitude, store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city_id', city_id);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/locals" + (local_id ? ("/" + local_id) : ""), {
            method: local_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveLocal(local_id, name, address, email, phone, city_id, latitude, longitude, store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteLocal = async (store_id, local_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/locals/" + local_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteLocal(store_id, local_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveDevice = async (local_id, store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {

        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/locals/" + local_id + "/devices", {
            method: 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => saveDevice(local_id, store_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteDevice = async (store_id, local_id, device_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/locals/" + local_id + "/devices/" + device_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteDevice(store_id, local_id, device_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getProducts = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/products", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getProducts(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveProduct = async (product_id, store_id, name, description, price, image_file, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image_file', image_file);

        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/products" + (product_id ? ("/" + product_id) : ""), {
            method: product_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveProduct(product_id, store_id, name, description, price, image_file, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteProduct = async (store_id, product_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/products/" + product_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteProduct(store_id, product_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getCoupons = async (store_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/coupons", {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getCoupons(store_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveCoupon = async (coupon_id, store_id, product_id, start, end, counter_max, discount, start_time, end_time, billboards, locals, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('counter_max', counter_max);
        formData.append('discount', discount);
        formData.append('start_time', start_time);
        formData.append('billboards', billboards);
        formData.append('locals', locals);
        formData.append('end_time', end_time);

        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/coupons" + (coupon_id ? ("/" + coupon_id) : ""), {
            method: coupon_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveCoupon(coupon_id, store_id, product_id, start, end, counter_max, discount, start_time, end_time, billboards, locals, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteCoupon = async (store_id, coupon_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/stores/' + store_id + "/coupons/" + coupon_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteCoupon(store_id, coupon_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getBillboards = async (city_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/billboards?city_id=' + city_id, {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getBillboards(city_id, callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}

export const saveBillboard = async (billboard_id, city_id, address, latitude, longitude, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const formData = new FormData();
        formData.append('city_id', city_id);
        formData.append('address', address);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        const response = await fetch('http://34.73.113.72/billboards' + (billboard_id ? ("/" + billboard_id) : ""), {
            method: billboard_id ? 'PUT' : 'POST',
            headers: new Headers({'Authorization':'Bearer ' + token}),
            body: formData,
        });
        if (response.status === 401) {
            refreshToken(() => saveBillboard(billboard_id, city_id, address, latitude, longitude, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const deleteBillboard = async (billboard_id, callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/billboards/' + billboard_id, {
            method: 'DELETE',
            headers: new Headers({'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => deleteBillboard(billboard_id, callback));
        } else {
            const json = await response.json();
            callback(response.ok, json);
        }
    }
}

export const getCiudades = async (callback) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        const response = await fetch('http://34.73.113.72/cities', {
            method: 'GET',
            headers: new Headers({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Bearer ' + token}),
        });
        if (response.status === 401) {
            refreshToken(() => getCiudades(callback));
        } else {
            const json = await response.json();
            callback(typeof json.data  == 'undefined' ? [] : json.data);
        }
    }
}