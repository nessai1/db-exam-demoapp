import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect} from "react";
import SitesList from "./components/SitesList";

function App(props) {
  const fetchData = async () => {
    const res = fetch('/api/test.php').then(res => res.json());
    return res;
  }
  useEffect(() => {
    fetchData().then((rs) => {
      console.log(rs)
    });
  }, []);

  return <SitesList/>
}

export default App;
