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
        public function getStudentCalendar()
        {
            $calendar = StudentClass::where('id', session()->get('class_id'))->first()->teachings()
            ->join('giorni_settimana', 'giorni_settimana.id', '=', 'insegnamento.giorno_settimana')
            ->join('disciplina', 'disciplina.id', '=', 'insegnamento.disciplina')
            ->join('orari', 'orari.id', '=', 'insegnamento.ora')
            ->select('nome_disciplina', 'giorno as giorno_settimana', 'orario as ora')
            ->get(); 
            echo json_encode($calendar);
        }
        public function getStudentAttendances()
        {
            $student = Student::where('cf', session()->get('cf'))->first();
            $studentAttendances = $student->attendances()->get(['data', 'presenza']);
            echo json_encode($studentAttendances);
        }
        public function getStudentGrades()
        {   
            $student = Student::where('cf', session()->get('cf'))->first();
            $studentGrades = $student->grades()
            ->join('disciplina', 'disciplina.id', '=', 'voti_attuali_alunno.disciplina')
            ->get(['data', 'nome_disciplina', 'voto', 'tipologia_voto']);
            echo json_encode($studentGrades);
        }
        public function postClassMessage(Request $request)
        {
            $msg = new StudentClassMessage;
            $msg->id_studente = session()->get('student_id');
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