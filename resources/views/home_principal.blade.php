@extends('layouts.user')

@section('scripts')
    <script src="{{ asset('scripts/home_principal_buttons.js') }}" defer></script>
    <script src="{{ asset('scripts/client_form_validation.js') }}" defer></script>
    <script src="{{ asset('scripts/add_circular.js') }}" defer></script>
    <script src="{{ asset('scripts/input_checks.js') }}" defer></script>
    <script src="{{ asset('scripts/utils.js') }}" defer></script>
@endsection

@section('buttons')
    <div id='buttons-block'>
        <a class='btn'>Aggiungi circolare</a>
    </div>
@endsection
@section('contents')
    @include('add_circular_form')
@endsection