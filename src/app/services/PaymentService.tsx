export const downloadPaymentsExcel = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            is_enrollment: true
        })
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/payments/payment_list", requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'payments.xlsx';
                a.click();
            })
        })
        .catch(function (e) {
            console.log("error", e);
        });
}