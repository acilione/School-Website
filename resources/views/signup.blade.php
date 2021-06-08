@extends('layouts.guest')

@section('css')
<link rel='stylesheet' href="{{ asset('css/login.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('scripts/utils.js') }}" defer></script>
<script src="{{ asset('scripts/client_form_validation.js') }}" defer></script>
<script src="{{ asset('scripts/signup.js') }}" defer></script>
<script src="{{ asset('scripts/input_checks.js') }}" defer></script>
@endsection
@section('content')
<section id="content">
        <h1>SignUp</h1>
        <span class="insert-feedback-message"></span> 
        <form name="signup_form" method="post">
            <label>Codice Fiscale 
              <span class='input_error hidden cf_error'>formato cf errato</span>
              <span class='input_error hidden cf_taken_error'>cf gia' utilizzato</span>
              <input type="text" name="cf" />
            </label>
            <label>Nome 
              <span class='input_error hidden name_error'>formato nome errato</span> 
              <input type="text" name="name" />
            </label>
            <label>Cognome 
              <span class='input_error hidden surname_error'>formato cognome errato</span>
              <input type="text" name="surname" /> 
            </label>
            <label>Email 
              <span class='input_error hidden email_error'>formato email errato</span>
              <span class='input_error hidden email_taken_error'>email gia' utilizzata</span>
              <input type="email" name="email">
            </label>
            <label>Password 
              <span class='input_error hidden password_error'>formato password errato (inserire 8 caratteri e nessun car. speciale)</span>
              <input type="password" name="password">
            </label>
            <label>Data Nascita 
              <span class='input_error hidden date_error'>formato data errato</span>
              <input type="date" name="date" />
            </label>
            <select name="sex" id="sex">
                <option value="M">M</option>
                <option value="F">F</option>
            </select>
            <select name="role" id="role">
                <option value="segretario">segretario</option>
            </select>
            <label>Data Inizio Lavoro
              <span class='input_error hidden beginning_date_error'>formato data errato</span>
              <input type="date" name="beginning_date" />
            </label>
            <label>Url immagine del profilo
              <input type="text" name="profile_img">
            </label>
            <label>&nbsp;<input type="submit" /></label>
        </form>
    </section>
@endsection