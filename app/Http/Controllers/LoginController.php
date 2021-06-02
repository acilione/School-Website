<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Session;

    use App\Models\Student;
    use App\Models\Worker;
    
    class LoginController extends Controller 
    {
        public function showLoginPage() 
        {
            return view('login');
        }
        public function checkPageAccessAuth($view, $session_data, $login_type_requested, $role_requested=null)
        {
            if (!empty($session_data['login_type']))
            {
                if ($session_data['login_type'] !== $login_type_requested)
                    return redirect('login');
                if ($session_data['login_type'] === 'worker')
                {
                    if ($session_data['role'] !== $role_requested)
                        return redirect('login');
                    else
                        return view($view);
                }
                else
                    return view($view);
            }
            else
            {
               return redirect('login');
            }
        }
        public function checkRole()
        {
            if (!empty(session()->get('login_type')))
            {
                if (session()->get('login_type') === 'student') 
                    return redirect('student-home');
                else if(session()->get('login_type') === 'worker')
                {
                    if (session()->get('role') === 'preside')
                        return redirect('principal-home');
                    else if (session()->get('role') === 'docente')
                        return redirect('teacher-home');
                    else if (session()->get('role') === 'segretario')
                        return redirect('secretary-home');
                }
            }
            else 
                return $this->showLoginPage();
        }
        public function checkLogin(Request $request)
        {
            $cf = $request->input('cf');
            $password = $request->input('password');
            $login_type = $request->input('login_type');
            if (!empty($cf) && !empty($password))
            {
                if ($login_type === 'student')
                {
                    $student = Student::where('cf', $cf)->first();
                    if (empty($student->cf))
                    {
                        $login_feedback = array(
                            'feedback_message' => 'Credenziali non valide!', 
                            'error' => 1
                        );
                        echo json_encode($login_feedback);
                        exit;
                    }
                    $password_hash = $student->password;
                    if (password_verify($password, $password_hash))
                    {
                        session()->put('student_id', $student->id);
                        session()->put('cf', $student->cf);
                        session()->put('name', $student->nome);
                        session()->put('login_type', $login_type);
                        session()->put('class_id', $student->classe);
                        $login_feedback = array(
                            'feedback_message' => 'student-home', 
                            'error' => 0
                        );
                        echo json_encode($login_feedback);
                    }
                    else
                    {
                        $login_feedback = array(
                            'feedback_message' => 'Credenziali non valide!', 
                            'error' => 1
                        );
                        echo json_encode($login_feedback);
                        exit;
                    }
                } //fine gestione login studente
                else if ($login_type === 'worker')
                {
                    $worker = Worker::where('cf', $cf)->first();
                    if (empty($worker->cf))
                    {
                        $login_feedback = array(
                            'feedback_message' => 'Credenziali non valide!', 
                            'error' => 1
                        );
                        echo json_encode($login_feedback);
                        exit;
                    }
                    $password_hash = $worker->password;
                    $ruolo = $worker->role()->first()->ruolo;
                    if (password_verify($password, $password_hash))
                    {
                        session()->put('cf', $worker->cf);
                        session()->put('name', $worker->nome);
                        session()->put('login_type', $login_type);
                        session()->put('role', $ruolo);
                        if ($ruolo === 'docente')
                        {
                            $login_feedback = array(
                                'feedback_message' => 'teacher-home', 
                                'error' => 0
                            );
                        }
                        else if ($ruolo === 'preside')
                        {
                            $login_feedback = array(
                                'feedback_message' => 'principal-home', 
                                'error' => 0
                            );
                        }
                        else if ($ruolo === 'segretario')
                        {
                            $login_feedback = array(
                                'feedback_message' => 'secretary-home', 
                                'error' => 0
                            );
                        }
                        echo json_encode($login_feedback);
                    }
                    else
                    {
                        $login_feedback = array(
                            'feedback_message' => 'Credenziali non valide!', 
                            'error' => 1
                        );
                        echo json_encode($login_feedback);
                        exit;
                    }
                } //fine gestione login lavoratore
            }  
        }
        public function logout()
        {
            Session::flush();
            return redirect('login');
        }
    }
?>
