               <iframe
                        width="600"
                        height="450"
                        frameborder="0" style={{border:0}}
                        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCP0aaxLXVh5E4162hP3hnNLs-Nxjz7lrc&origin=4950+E+VAN+BUREN+PHOENIX+AZ&destination=101+N+1ST+AVE+PHOENIX+AZ" 
                        allowfullscreen>
                    </iframe>

                    can enter straight addresses into it with + instead of spaces





const thing="term=chorizo&location=4950+E+VAN+BUREN,Phoenix,az&radius=40000"

axios.get(`http://localhost:3535/api/search/${thing}`, )