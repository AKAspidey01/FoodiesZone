exports.html =(email_verify_code)=>{
    email_verify_code =  JSON.parse(JSON.stringify(email_verify_code));
    const html =`<!DOCTYPE html>
    <h1>Eat Zone Email verification</h1>
    <h3>Your verification code : ${email_verify_code}</h3>
    </html>`
   return html;
}