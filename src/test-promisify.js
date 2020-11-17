
console.log('Timer started.')
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('TimesUp.');
    }, 3000);
}).then((msg) => {
    console.log('then TimesUp.', msg);
    console.log('Timer done !!');
}).catch(e => {
    console.log('catch Timer error.', e);
})