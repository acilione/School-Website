@extends('layouts.guest')

@section('css')
<link rel='stylesheet' href="{{ asset('css/login.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('scripts/utils.js') }}" defer></script>
<script src="{{ asset('scripts/input_checks.js') }}" defer></script>
<script src="{{ asset('scripts/login.js') }}" defer></script>
@endsection

@section('content')
    <section id="content">
      <h1>Login</h1>
      <span class="insert-feedback-message"></span>
      <form name="login"  method="post">
        @csrf
        <label>Codice Fiscale <input type="text" name="cf" /></label>
        <label>Password <input type="password" name="password" /></label>
        <label>&nbsp;<input type="submit" /></label>
        <h2>Effettua il login come:</h2>
        <select name="login_type" id="person_role_option">
          <option value="student">Studente</option>
          <option value="worker">Personale Scolastico</option>
        </select>
      </form>
    </section>
@endsection