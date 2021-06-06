<?php
    namespace App\Http\Controllers;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\LoginController;
    use Illuminate\Http\Request;
    use Illuminate\Database\QueryException;

    use App\Models\Student;
    use App\Models\StudentAttendance;
    use App\Models\StudentClass;
    use App\Models\Teaching;
    use App\Models\StudentGrade;
    use App\Models\Subject;

    class TeacherHomeController extends Controller
    {
        public function showTeacherHome()
        {
            $loginController = new LoginController();
            return $loginController->checkPageAccessAuth("home_teacher", session()->all(), "worker", "docente");    
        }
        function student_grade_form_valid($post_data) 
        {
            if (
                !((int)$post_data->mark >= 0 && (int)$post_data->mark <= 10)
                ) {
                    return (false);
                }
            else 
              return (true);
        }
        public function addStudentMark(Request $request)
        {
            $cf_student = $request->student_to_grade;
            $student = Student::where('cf', $cf_student)->get();
            if (!count($student))
            {
                echo json_encode("cf studente non valido!");
                exit;
            }
            else
                $student_id = $student->first()->id;
            if (!$this->student_grade_form_valid($request))
            {
                echo json_encode("Campi non validi!");
                exit;
            }
            $subject_name = $request->subject;
            $subject = Subject::where('nome_disciplina', $subject_name)->get();
            if (!count($subject))
            {
                echo json_encode("nome disciplina non valido!");
                exit;
            }
            else
                $subject_id = $subject->first()->id;
            $grade = new StudentGrade;
            $grade->alunno = $student_id;
            $grade->data = $request->grade_date;
            $grade->disciplina = $subject_id;
            $grade->voto = $request->mark;
            $grade->tipologia_voto = $request->mark_type;
            try {
                $grade->save();
            } catch (QueryException $e) {
                echo json_encode($e->errorInfo['2']);
                exit;
            }
            echo json_encode('Voto inserito correttamente!');
        }
        public function addStudentAttendance(Request $request)
        {
            if ($request->attendance_value !== 'A' && $request->attendance_value !== 'P')
            {
                print(json_encode('Valore presenza non valido!'));
                exit;
            }
            $student_cf = $request->student_attending;
            $student = Student::where('cf', $student_cf)->get();
            if (!count($student))
            {
                print(json_encode('cf non valido!'));
                exit;
            }
            else
                $student_id = $student->first()->id;
            $attendance = new StudentAttendance;
            $attendance->alunno = $student_id;
            $attendance->data = $request->attendance_date;
            $attendance->presenza = $request->attendance_value;
            try {
                $attendance->save();
            } catch (QueryException $e) {
                echo json_encode($e->errorInfo['2']);
                exit;
            }
            print(json_encode('Presenza inserita correttamente!')); 
        }
        public function modifyStudentAttendance(Request $request)
        {
            if ($request->attendance_value !== "P" && $request->attendance_value !== "A")
            {
                echo json_encode('Valore presenza non valido');
                exit;
            }
            $student_id = $request->student_id;
            $attendance_date = $request->attendance_date;
            $attendance_value = $request->attendance_value;
            $attendance = StudentAttendance::where('alunno', $student_id)
            ->where('data', $attendance_date)
            ->first();
            $attendance->presenza = $attendance_value;
            try {
                $attendance->save();
            } catch (QueryException $e) {
                echo json_encode($e->errorInfo);
                exit;
            }
            print(json_encode('Presenza modificata correttamente!')); 
        }
        public function modifyStudentMark(Request $request)
        {
            //codice modifica voto alunno            
            $student_id = $request->student_id;
            if (!$this->student_grade_form_valid($request))
            {
                echo json_encode("Campi non validi!");
                exit;
            }
            $subject_name = $request->subject;
            $subject = Subject::where('nome_disciplina', $subject_name)->get();
            if (!count($subject))
            {
                echo json_encode("nome disciplina non valido!");
                exit;
            }
            else
                $subject_id = $subject->first()->id;
            $grade = StudentGrade::where('alunno', $student_id)
                ->where('disciplina', $subject_id)
                ->where('data', $request->grade_date)
                ->first();
            $grade->voto = $request->mark;
            try {
                $grade->save();
            } catch (QueryException $e) {
                echo json_encode($e->errorInfo['2']);
                exit;
            }
            echo json_encode('Voto modificato correttamente!');
        }
    }
?>