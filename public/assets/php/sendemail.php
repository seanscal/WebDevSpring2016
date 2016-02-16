    <?php

if (!empty($_POST)) {

    // Enter the email where you want to receive the message
    $emailTo = 'me@myemail.com';

    $clientName = trim($_POST['name']);
    $clientEmail = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    $errors = array();

    if (empty($clientName)) {
        $errors['nameMessage'] = 'Please enter your name.';
    }
    if (!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
        $errors['emailMessage'] = 'Please insert a valid email address.';
    }
    if (empty($message)) {
        $errors['messageMessage'] = 'Please enter your message.';
    }

    // Are there errors?
    if (count($errors) == 0) {
        // Send email
        $headers = "From: " . $clientName . " <" . $clientEmail . ">" . "\r\n" . "Reply-To: " . $clientEmail;
        mail($emailTo, $subject, $message, $headers);
        header("Hi");
    } else {
        foreach ($errors as $err) {
            echo $err . '<br />';
        }
    }
}
?>