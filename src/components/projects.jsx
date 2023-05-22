import React, {useEffect, useState} from "react";

function Projects() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch("https://sherwoodprojectdata.blob.core.windows.net/tech-challenge/projects.json");
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData)
        }   catch (error) {
            console.error("Error", error);
        }
    };

    fetchData();
    }, []);

    return (
        <div>
        {data.map((project) => (
          <div key={project.id} project={project}>
          </div>
        ))}
      </div>
    )
}
export default Projects;