<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use App\Http\Controllers\InpuChecksController;
    use Illuminate\Http\Request;

    use App\Models\Circular;

    class PasswordController extends Controller
    {
        function randomPassword() 
        {
            $psswd_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            $pass = array();
            $alpha_length = strlen($psswd_chars) - 1;
            for ($i = 0; $i < 8; $i++) {
                $pos = rand(0, $alpha_length);
                $pass[] = $psswd_chars[$pos];
            }
            return implode($pass);
        }
    }
?>