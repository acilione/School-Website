@extends('layouts.user')

@section('scripts')
    <script src="{{ asset('scripts/utils.js') }}" defer></script>
    <script src="{{ asset('scripts/client_form_validation.js') }}" defer></script>
    <script src="{{ asset('scripts/input_checks.js') }}" defer></script>
    <script src="{{ asset('scripts/add_worker.js') }}" defer></script>
    <script src="{{ asset('scripts/home_secretary_buttons.js') }}" defer></script>
    <script src="{{ asset('scripts/add_student.js') }}" defer></script>
    <script src="{{ asset('scripts/add_worker.js') }}" defer></script>
    <script src="{{ asset('scripts/view_students.js') }}" defer></script>
    <script src="{{ asset('scripts/view_workers.js') }}" defer></script>
    <script src="{{ asset('scripts/add_teaching.js') }}" defer></script>
@endsection

@section('buttons')
    <div id='buttons-block'>
        <a class='btn'>Aggiungi Studente</a>
        <a class='btn'>Aggiungi Lavoratore</a>
        <a class='btn'>Visualizza Studenti</a>
        <a class='btn'>Visualizza Lavoratori</a>
        <a class='btn'>Aggiungi Insegnamento</a>
    </div>
@endsection
@section('contents')
    @include('add_student_form')
    @include('add_worker_form')
    @include('add_teaching_form')
    @include('secretary_view_students')
    @include('secretary_view_workers')
@endsection