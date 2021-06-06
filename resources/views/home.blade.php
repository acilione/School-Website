@extends('layouts.guest')

@section('css')
<link rel='stylesheet' href="{{ asset('css/home.css') }}">
@endsection

@section('scripts')
<script src="{{ asset('scripts/utils.js') }}" defer></script>
<script src="{{ asset('scripts/home.js') }}" defer></script>
@endsection
@section('content')
    <section id="content">
      <span class="hidden" id="no-search-result">Nessun risultato trovato</span>
      <form name="db_search" method="post">
        <input type="text" name="db_search_bar" id='db-search-bar' placeholder="effettua ricerca">
        <label>ricerca:
          <select name="filter_selection">
            <option value="circolari">Circolari</option>
            <option value="docenti">Docenti</option>
          </select>
          <input type="submit">
        </label>
      </form>
      <div class="hidden" id="searched-content"></div>
      <input type="text" id="filter-bar" placeholder="Filter sections">
    </section>
@endsection