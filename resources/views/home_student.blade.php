@extends('layouts.user')

@section('css')
    <link rel='stylesheet' href="{{ asset('css/home_student.css') }}">
@endsection


@section('scripts')
    <script src="{{ asset('scripts/utils.js') }}" defer></script>
    <script src="{{ asset('scripts/home_student_buttons.js') }}" defer></script>
    <script src="{{ asset('scripts/student_calendar.js') }}" defer></script>
    <script src="{{ asset('scripts/student_grades.js') }}" defer></script>
    <script src="{{ asset('scripts/student_attendance.js') }}" defer></script>
    <script src="{{ asset('scripts/class_messages.js') }}" defer></script>
    <script src="{{ asset('scripts/input_checks.js') }}" defer></script>
@endsection

@section('buttons')
    <div id='buttons-block'>
        <a class='btn'>Orario Scolastico</a>
        <a class='btn'>Voti</a>
        <a class='btn'>Presenze</a>
        <a class='btn'>Messaggi Classe</a>
    </div>
@endsection
@section('contents')
    <div class='content-block' id='student-calendar-block'></div>
    <div class="content-block" id="student-grades-block"></div>
    <div class='content-block' id='student-attendance-block'></div>
    @include('class_messages')
@endsection