<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;

    use App\Models\Student;
    use App\Models\Worker;

    class InputChecksController extends Controller
    {
        public function fiscalCodeValid($cf)
        {
            $pattern = "/^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$"."/i";
            $boolean = preg_match($pattern, $cf);
            return($boolean);
        }
        public function nameValid($name) 
        {
            $pattern = "/^[a-zA-Z]+(?: [a-zA-Z+]+)* ?$"."/i";
            $boolean = (preg_match($pattern, $name)) && (strlen($name) < 30);
            return ($boolean); 
        }
        public function surnameValid($surname) 
        {
            $pattern = "/^[a-zA-Z]+$"."/i";
            $boolean = (preg_match($pattern, $surname)) && (strlen($surname) < 30);
            return ($boolean); 
        }
        public function emailValid($email) 
        {
            $pattern = "/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"."/i";
            return (preg_match($pattern, $email) && strlen($email) < 255);
        } 
        public function ageValid($age) 
        {
            $pattern = "/^(1[2-9]|2[0-2])$"."/i";
            return (preg_match($pattern, $age));
        }
        public function classNumValid($class_num) 
        {
            $pattern = "/^[0-5]$"."/i";
            return (preg_match($pattern, $class_num));
        }
        public function classSectionValid($class_section)
        {
            $pattern = "/^[A-G]"."/i";
            return (preg_match($pattern, $class_section));
        }
        public function dateValid($date) 
        {
            $pattern = "/^[1-2][0-9][0-9][0-9]-([0][0-9]|[1][0-2])-[0-3][0-9]$"."/i";
            return (preg_match($pattern , $date));
        }
        public function sexValid($sex) 
        {
            $pattern = "/^[MF]$"."/i";
            return (preg_match($pattern, $sex));
        }
        public function passwordValid($password)
        {
            $pattern = "/^[a-zA-Z0-9]{8}$"."/i";
            return (preg_match($pattern, $password));
        }
        public function emailAlreadyTaken(Request $request)
        {
            $emailStudent = Student::where('email', $request->input('email_address'))->select('email');
            $emailWorker = Worker::where('email', $request->input('email_address'))->select('email');
            $result = $emailStudent->union($emailWorker)->get();
            echo json_encode($result);
        }
        public function cfAlreadyTaken(Request $request)
        {
            $cfStudent = Student::where('cf', $request->input('cf'))->select('cf');
            $cfWorker = Worker::where('cf', $request->input('cf'))->select('cf');
            $result = $cfStudent->union($cfWorker)->get();
            echo json_encode($result);
        }
    }
?>