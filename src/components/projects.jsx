import React, { useEffect, useState} from 'react'

function Projects () {
  const [data, setData] = useState([])

  useEffect(() => {
        // gathers data from datasource and formats to JSON
        const fetchData = async () => {
        try {
            const response = await fetch("https://sherwoodprojectdata.blob.core.windows.net/tech-challenge/projects.json");
            const jsonData = await response.json();
            setData(jsonData);
            //console.log(jsonData) // to log out project data
        }   catch (error) {
            console.error("Error", error);
        }
    };

    fetchData();
    // empty dependency array means it should only fetch data once
    }, []);

    function displayDate(unix) {
        // function needed to put date in presentable format
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date(unix*1000)
        // the unix * 1000 is becuase dates are given in seconds 
        // but Date() takes in time in milliseconds
        let day = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear()

        return day +" "+ month + " " + year
    };

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, match => match.toUpperCase());
      }
      

    const Card = ({project}) => {
        // takes in individual project data and creates itemCard
        const [isPurchased, setIsPurchased] = useState(false);

        const handleClick = () => {
          setIsPurchased(!isPurchased);
        };

        return (
        <div className="project-card">
            <div className="image-container"> 
                <img className="image" src={project.image} alt={project.name}/>
            </div>
            <div className="container">
                <div className="outline">
                    <h3> {capitalizeWords(project.name)} </h3>
                    <button className={`button ${isPurchased ? 'purchased' : 'purchase'}`} onClick={handleClick}>
                    {isPurchased ? 'Purchased' : 'Purchase'}
                    </button>
                </div>
                <div className="outline">
                    <p> {project.available_credits} credits <br/>
                    {displayDate(project.start_date)} </p>
                </div>
            </div>
        </div>)}

    const sortedData = [...data].sort(
        // sorts projects by date (descending)
        (a, b) => b.start_date - a.start_date
    );

    return (
        <div>
        <h3>Project List</h3>
        <div className="itemGrid">
        {sortedData.map((project) => (
            <Card key={project.id} project={project}/>
        ))}
        </div>
        </div>
)
}
export default Projects;