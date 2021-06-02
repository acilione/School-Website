<header>
      <div id="overlay"></div>
      <nav>
        <div id="logo">
          <img src="imgs/logo.png" alt="" />
        </div>
        <div id="links">
            <a class="navbar-btn" href="index">Home</a>
            <a class="navbar-btn" href="activities">Attivita'</a>
            @if ( session('cf') == "" )
                <a class="navbar-btn" href="signup">Amministrazione - SignUp</a>
                <a class="navbar-btn" href="login">Login</a>
            @else
                <a>Benvenuto  {{ session('cf') }} </a>
                <a class="navbar-btn" href="login">Area Personale</a>
                <a class="navbar-btn" href="logout">Logout</a>
            @endif
        </div>
        <div id="menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <h1>Istituto superiore G.Verga</h1>
</header>