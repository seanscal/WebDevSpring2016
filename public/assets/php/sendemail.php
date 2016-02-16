<?php

 // Enter the email where you want to receive the message
    $emailTo = 'seanscala@gmail.com';

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
        header("location:../thankyou.html");
    } else {
        foreach ($errors as $err) {
            echo $err . '<br />';
        }
    }
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<script>alert("Thank you for contact us. As early as possible  we will contact you.");</script>
	<meta HTTP-EQUIV="REFRESH" content="0; url=http://trendytheme.net/demo/iamx/v/">
</head>