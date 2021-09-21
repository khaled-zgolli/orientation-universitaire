import "./sidebar.scss";

export default function Sidebar(params) {
  return (
    <div class="sidebarrr">
      <div id="wrapper" class="toggled-2">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li class="active">
              <a href="/Admin_table">
                <span class="fa-stack fa-lg ">
                <i class="fas fa-home  fa-stack-1x "></i>
                </span>
                Acceuil
              </a>
            </li>
            <li>
              <a href="/Admin_table/membres">
                <span class="fa-stack fa-lg ">
                <i class="fas fa-user  fa-stack-1x "></i>
                </span>
                Membres 
              </a>
            </li>
            <li>
              <a href="/Admin_table/Instituts">
                <span class="fa-stack fa-lg ">
                  <i class="fas fa-university fa-stack-1x "></i>
                </span>
                Etablissements
              </a>
            </li>
            <li>
              <a href="/Admin_table/Articles">
                <span class="fa-stack fa-lg ">
                <i class="fas fa-newspaper fa-stack-1x"></i>
                </span>
                Articles
              </a>
            </li>
            <li>
              <a href="/Admin_table/Actualités">
                <span class="fa-stack fa-lg ">
                <i class="far fa-newspaper fa-stack-1x"></i>
                </span>
                Actualités
              </a>
            </li>
            <li>
              <a href="/Admin_table/Agenda">
                <span class="fa-stack fa-lg ">
                <i class="far fa-calendar-alt fa-stack-1x"></i>                
                </span>
                Agenda
              </a>
            </li>
            <li>
              <a href="/Admin_table/Visioconférence">
                <span class="fa-stack fa-lg ">
                <i class="fas fa-video fa-stack-1x"></i>
                </span>
                Visio-conférence
              </a>
            </li>
            <li>
              <a href="/Admin_table/Questions">
                <span class="fa-stack fa-lg ">
                <i class="fas fa-question-circle fa-stack-1x"></i>
                </span>
                Questions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
