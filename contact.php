<?php
// ================================
// Contact Form Handler
// ================================

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// CORS Headers (ако е нужно)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ================================
// Configuration - ПРОМЕНИ ТЕЗИ НАСТРОЙКИ
// ================================

$to_email = 'office@rudyvita.com'; // Твоят фирмен имейл
$from_name = 'SyperWeb Contact Form'; // Име на формата

// ================================
// Get and Sanitize Input
// ================================

function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get POST data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// ================================
// Validation
// ================================

$errors = [];

// Validate name
if (empty($name)) {
    $errors[] = 'Моля, въведете вашето име.';
} elseif (strlen($name) < 2) {
    $errors[] = 'Името трябва да е поне 2 символа.';
}

// Validate email
if (empty($email)) {
    $errors[] = 'Моля, въведете вашия email.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Моля, въведете валиден email адрес.';
}

// Validate message
if (empty($message)) {
    $errors[] = 'Моля, напишете съобщение.';
} elseif (strlen($message) < 10) {
    $errors[] = 'Съобщението трябва да е поне 10 символа.';
}

// If there are errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// ================================
// Anti-Spam Check (simple honeypot)
// ================================

// Проверка за твърде бързо изпращане (bot защита)
session_start();
$current_time = time();
if (isset($_SESSION['last_submission'])) {
    $time_diff = $current_time - $_SESSION['last_submission'];
    if ($time_diff < 3) { // Не позволявай изпращане по-често от на 3 секунди
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Моля, изчакайте малко преди да изпратите ново съобщение.'
        ]);
        exit;
    }
}
$_SESSION['last_submission'] = $current_time;

// ================================
// Prepare Email
// ================================

$subject = "Ново съобщение от $name - SyperWeb";

// Email body (HTML)
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #FF6B35; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #FF6B35; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📧 Ново Съобщение</h1>
            <p>От контактната форма на SyperWeb</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Име:</div>
                <div class='value'>$name</div>
            </div>
            
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            
            " . (!empty($phone) ? "
            <div class='field'>
                <div class='label'>📱 Телефон:</div>
                <div class='value'><a href='tel:$phone'>$phone</a></div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>💬 Съобщение:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
            
            <div class='footer'>
                <p>Получено на: " . date('d.m.Y H:i:s') . "</p>
                <p>IP адрес: " . $_SERVER['REMOTE_ADDR'] . "</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Plain text alternative
$plain_text = "
Ново съобщение от SyperWeb контактна форма
==========================================

Име: $name
Email: $email
" . (!empty($phone) ? "Телефон: $phone\n" : "") . "

Съобщение:
$message

---
Получено на: " . date('d.m.Y H:i:s') . "
IP адрес: " . $_SERVER['REMOTE_ADDR'] . "
";

// ================================
// Email Headers
// ================================

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: $from_name <$to_email>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "X-Priority: 1";
$headers[] = "Importance: High";

// ================================
// Send Email
// ================================

$mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => "Благодарим ви, $name! Вашето съобщение беше изпратено успешно. Ще се свържем с вас скоро."
    ]);
    
    // Optional: Log successful submission
    $log_file = __DIR__ . '/contact_log.txt';
    $log_entry = date('[Y-m-d H:i:s]') . " - Съобщение от: $name ($email)\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
    
} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Възникна грешка при изпращането на съобщението. Моля, опитайте отново или се свържете с нас директно на ' . $to_email
    ]);
    
    // Log error
    error_log("Contact form error: Failed to send email to $to_email");
}

exit;
?>
