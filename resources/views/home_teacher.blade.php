@extends('layouts.user')

@section('scripts')
    <script src="{{ asset('scripts/utils.js') }}" defer></script>
    <script src="{{ asset('scripts/input_checks.js') }}" defer></script>
    <script src="{{ asset('scripts/client_form_validation.js') }}" defer></script>
    <script src="{{ asset('scripts/home_teacher_buttons.js') }}" defer></script>
    <script src="{{ asset('scripts/teacher_ops.js') }}" defer></script>
    <script src="{{ asset('scripts/teacher_calendar.js') }}" defer></script>
    <script src="{{ asset('scripts/add_student_mark.js') }}" defer></script>
    <script src="{{ asset('scripts/add_student_attendance.js') }}" defer></script>
    <script src="{{ asset('scripts/teacher_students_grades_record.js') }}" defer></script>
    <script src="{{ asset('scripts/teacher_student_attendance_record.js') }}" defer></script>
@endsection

@section('buttons')
    <div id='buttons-block'>
        <a class='btn'>Orario Scolastico</a>
        <a class='btn'>Inserisci Voti</a>
        <a class='btn'>Visualizza Voti</a>
        <a class='btn'>Inserisci Presenze</a>
        <a class='btn'>Visualizza Presenze</a>
    </div>
@endsection
@section('contents')
    @include('add_student_mark_form')
    <div class='content-block' id='teacher-calendar-block'></div>
    @include('teacher_students_grades_record')
    @include('add_students_attendance_form')
    @include('teacher_students_attendance_record')
@endsection