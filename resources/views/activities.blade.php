@extends('layouts.user')

@section('scripts')
    <script src="{{ asset('scripts/activities_page_buttons.js') }}" defer></script>
    <script src="{{ asset('scripts/equationsAPI.js') }}" defer></script>
    <script src="{{ asset('scripts/harvardMuseumAPI.js') }}" defer></script>
    <script src="{{ asset('scripts/utils.js') }}" defer></script>
@endsection

@section('buttons')
    <div id='buttons-block'>
        <a class='btn'>Risolvi equazioni</a>
        <a class='btn'>Harvard Museum Gallery</a>
    </div>
@endsection
@section('contents')
    <div class='content-block' id='equationsAPI-block'></div>
    <div class='content-block' id='harvardMuseumAPI-block'></div>
@endsection