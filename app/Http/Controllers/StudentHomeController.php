<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;

    use App\Models\Student;
    use App\Models\StudentAttendance;
    use App\Models\StudentClass;
    use App\Models\Teaching;
    use App\Models\StudentClassMessage;


    class StudentHomeController extends Controller
    {
        public function showStudentHome()
        {
            $loginController = new LoginController();
            return $loginController->checkPageAccessAuth("home_student", session()->all(), "student");
        }
        public function postClassMessage(Request $request)
        {
            $msg = new StudentClassMessage;
            $msg->id_studente = session()->get('student_id');
            $msg->id_classe = session()->get('class_id');
            $msg->testo_messaggio = $request->msg;
            try {
                $msg->save();
            } catch (QueryException $e) {
                echo json_encode($e->errorInfo['2']);
                exit;
            }
        }
    }
?>