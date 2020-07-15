const qs = (e) => document.querySelector(e)
const ce = (e) => document.createElement(e)

const URL = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded", () => {
    const filterButton = qs("button#good-dog-filter")
    const dogBar = qs("div#dog-bar")
    const dogInfo = qs("div#dog-info")
    const allDogSpans = document.querySelectorAll("span.dog")

    function fetchDogs(){
        fetch(URL)
            .then(resp => resp.json())
            .then(dogs => loadBar(dogs))
            .catch(error => console.log(error))
    }

    function loadBar(dogs){
        for (const dog of dogs){
            makeDogSpan(dog)
        }
    }

    function makeDogSpan(dog){
        const dogSpan = ce("span")
        dogSpan.innerText = dog.name
        dogSpan.classList.add("dog")

        dogSpan.addEventListener("click", () => loadDogInfo(dog))

        dogBar.appendChild(dogSpan)
    }

    function loadDogInfo(dog){
        dogInfo.innerHTML = ""

        let dogImage = ce("img")
        dogImage.src = dog.image
        let dogName = ce("h2")
        dogName.innerText = dog.name

        let dogButton = ce("button")

        function readDogGoodness(){
            if (dog.isGoodDog){
                dogButton.innerText = "Good Dog!"
            } else{
                dogButton.innerText = "Bad Dog!"
            }
        }

        readDogGoodness()

        dogButton.addEventListener("click", () => {
            let configObj = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !dog.isGoodDog
                })
            }

            fetch(URL+dog.id, configObj)
                .then(resp => resp.json())
                .then(newDog => {
                    dog = newDog
                    readDogGoodness()
                })
        })

        dogInfo.append(dogImage, dogName, dogButton)
    }

    fetchDogs()
})