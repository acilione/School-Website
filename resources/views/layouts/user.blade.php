<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <link rel='stylesheet' href="{{ asset('css/header.css') }}">
      <link rel='stylesheet' href="{{ asset('css/footer.css') }}">
      <link rel='stylesheet' href="{{ asset('css/general.css') }}">
      <link rel='stylesheet' href="{{ asset('css/buttons.css') }}">
      <link rel='stylesheet' href="{{ asset('css/content_block_general.css') }}">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      @yield('css')
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
        rel="stylesheet"
      />
      <title>Scuola</title>
      <script src="{{ asset('scripts/requests.js') }}" defer></script>
      <script src="{{ asset('scripts/footer.js') }}" defer></script>
      @yield('scripts')
  </head>
  <body>
    @include('layouts/header')
    <div class="hidden" id="modal"></div>
    <section id="content">
        @yield('buttons')
        @yield('contents')
    </section>
    @include('layouts/footer')
  </body>
</html>
