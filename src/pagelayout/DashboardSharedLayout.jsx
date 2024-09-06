import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer/Footer";
import LibraryCatalogue from "../components/LibraryCatalogue/LibraryCatalogue";
import SearchBar from "../components/Searchbar/Searchbar";
// import { Outlet} from 'react-router-dom';



export default function DashboardSharedLayout({ children }) {
  return (
    <div className="page-enclose" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar showAvatar={true}/>
      
      {/* Main content area */}
      <div className="dashboard-home" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginTop: 120 }}>
          <SearchBar />
          <div className="container-fluid" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexGrow: 1 }}>
            
            {/* Sidebar section */}
            <div style={{ marginTop: 15 }}>
              <LibraryCatalogue />
            </div>
            
            {/* Main content section */}
            <div style={{ display: "flex", flexGrow: 1, flexDirection: "column", padding: "0 15px" }}>
              {children}
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
