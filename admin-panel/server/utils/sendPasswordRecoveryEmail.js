const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.sendPasswordRecoveryEmail = async ({ user }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.account_host, // Incoming server
            port: process.env.account_port, // SMTP port for secure SSL/TLS connection
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.account_email, // Your email address
                pass: process.env.account_email_password // Your email password
            }
        });

        // Email content
        const mailOptions = {
            from: {
                name: 'Life Insurance Poineers', // Custom sender name
                address: process.env.account_email // Your email address
            },
            to: user.email, // Recipient email address
            subject: 'Password Recovery Instructions ', // Email subject
            html: template(user),
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:',);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.log('error for sending mail to the admin', error);
    }
}


function template(user) {
    return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9"
    id="bodyTable">
    <tbody>
        <tr>
            <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview"
                    style="max-width:600px">
                    <tbody>
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;"
                                                align="right" valign="middle" class="webview"> <a href="#"
                                                    style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0"
                                                    target="_blank" class="text hideOnMobile"></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody"
                    style="max-width:600px">
                    <tbody>
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard"
                                    style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                    <tbody>
                                        <tr>
                                            <td style="background-color:blue;font-size:1px;line-height:3px"
                                                class="topBorder" height="3">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 60px; padding-bottom: 20px;" align="center"
                                                valign="top" class="imgHero">
                                                <a href="#" style="text-decoration:none" target="_blank">
                                                    <img alt="" border="0"
                                                        src="https://cdn-icons-png.flaticon.com/128/5569/5569147.png"
                                                        style="height:70px;display:block;color: #f9f9f9;" />
                                                </a>
                                                <br/><br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-left:20px;padding-right:20px" align="center" valign="top"
                                                class="containtTable ui-sortable">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    class="tableDescription">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-bottom: 20px;" valign="top"
                                                                class="description">
                                                                <b>Dear ${user.name},</b><br /><br />
                                                                <p class="text"
                                                                    style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;padding:0;margin:0">
                                                                    We understand that you've encountered an issue
                                                                    with your account password. Don't worry –
                                                                    we're here to help you regain access to your
                                                                    account!
                                                                </p><br />
                                                                <p class="text"
                                                                    style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;padding:0;margin:0">
                                                                    To reset your password and regain access, simply
                                                                    click on the following link:<br />
                                                                    ${user.resetLink}
                                                                </p><br />
                                                                <br />
                                                                <p class="text"
                                                                    style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;padding:0;margin:0">
                                                                    Best regards,<br />
                                                                    Life Insurance Poineers
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                    <tbody>
                                        <tr>
                                            <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </td>
        </tr>
    </tbody>
</table>
    `
}