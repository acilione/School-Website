<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\StudentHomeController;
use App\Http\Controllers\SecretaryHomeController;
use App\Http\Controllers\TeacherHomeController;
use App\Http\Controllers\PrincipalHomeController;
use App\Http\Controllers\InputChecksController;
use App\Http\Controllers\ExternalAPIsController;
use App\Http\Controllers\InternalAPIController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/index', [HomeController::class, 'showHomepage']);
Route::get('/login', [LoginController::class, 'checkRole']);
Route::post('/login', [LoginController::class, 'checkLogin']);
Route::get('/logout', [LoginController::class, 'logout']);
Route::get('/signup', [SignupController::class, 'index']);
Route::post('/signup', [SignupController::class, 'signup']);

Route::get('/student-home', [StudentHomeController::class, 'showStudentHome']);
Route::get('/student-calendar', [StudentHomeController::class, 'getStudentCalendar']);
Route::get('/student-attendances', [StudentHomeController::class, 'getStudentAttendances']);
Route::get('/student-grades', [StudentHomeController::class, 'getStudentGrades']);
Route::post('student-message-addition', [StudentHomeController::class, 'postClassMessage']);

Route::get('/secretary-home', [SecretaryHomeController::class, 'index']);
Route::post('/student-addition', [SecretaryHomeController::class, 'addStudent']);
Route::post('/worker-addition', [SecretaryHomeController::class, 'addWorker']);
Route::post('/student-modification', [SecretaryHomeController::class, 'modifyStudent']);
Route::post('/teaching-addition', [SecretaryHomeController::class, 'addTeaching']);

Route::get('/teacher-home', [TeacherHomeController::class, 'showTeacherHome']);
Route::post('/student-mark-addition', [TeacherHomeController::class, 'addStudentMark']);
Route::post('/student-mark-modification', [TeacherHomeController::class, 'modifyStudentMark']);
Route::post('/student-attendance-addition', [TeacherHomeController::class, 'addStudentAttendance']);
Route::post('/student-attendance-modification', [TeacherHomeController::class, 'modifyStudentAttendance']);

Route::get('/principal-home', [PrincipalHomeController::class, 'index']);
Route::post('/circular-addition', [PrincipalHomeController::class, 'addCircular']);

Route::post('/email-availability-check', [InputChecksController::class, 'emailAlreadyTaken']);
Route::post('/cf-availability-check', [InputChecksController::class, 'cfAlreadyTaken']);

Route::get('/activities', [ExternalAPIsController::class, 'activitiesIndex']);
Route::post('/mathAPI', [ExternalAPIsController::class, 'mathAPI']);
Route::get('/harvardMuseumAPI', [ExternalAPIsController::class, 'harvardMuseumAPI']);

Route::get('/all-students', [InternalAPIController::class, 'getAllStudents']);
Route::post('/class-students', [InternalAPIController::class, 'getClassStudents']);
Route::get('/teachers', [InternalAPIController::class, 'getTeachers']);
Route::get('/classes', [InternalAPIController::class, 'getClasses']);
Route::get('/subjects', [InternalAPIController::class, 'getSubjects']);
Route::get('/week-days', [InternalAPIController::class, 'getWeekDays']);
Route::get('/hours', [InternalAPIController::class, 'getHours']);
Route::get('/teacher-calendar', [InternalAPIController::class, 'getTeacherCalendar']);
Route::get('/teacher-students-attendances', [InternalAPIController::class, 'getStudentsAttendances']);
Route::get('/teacher-classes-numbers', [InternalAPIController::class, 'getTeacherClassesNumbers']);
Route::get('/teacher-classes-sections', [InternalAPIController::class, 'getTeacherClassesSections']);
Route::post('/teacher-class-subjects', [InternalAPIController::class, 'getTeacherClassesSubjects']);
Route::post('/student-attendances', [InternalAPIController::class, 'getStudentAttendances']);
Route::post('/student-subject-grades', [InternalAPIController::class, 'getStudentSubjectGrades']);
Route::get('/class-messages', [InternalAPIController::class, 'getClassMessages']);