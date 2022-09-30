import { Circle, Icon, Link, Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { auth } from "../firebase"
import { Container } from "./container"
import useAuth from "./hooks/useAuth"

const fileNames = [
    "index.js",
    "layout.js",
    "useAuth.js",
    "auth.js",
    "firebase.js",
    "index.html",
    "index.css",
    "package.json",
    "package-lock.json",
    "photo.png",
    "text.txt",
    "README.md",
    "LICENSE",
    "favicon.ico",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "404.html",
    "CNAME",
    "netlify.toml",
    "iguessthatseaster.egg",
    "funny_hat.gif",
    "poro_twerk.gif",
    "hello.txt",
    "❤❤.png",
    "this_is_random_file.svg",
    "sylis.<3",
    "<3.txt",
    "love_letter.txt",
    "heart.png",
    "zse.huj",
    "rainbow.heh",
    "hearts.random",
    "we_all_hate.wfm",
    "glOnMaturaKuba.png"
]

const textCount = 25

export const Layout = ({ children }) => {
    const { isLoggedIn, user } = useAuth()

    function generate() {
        setTimeout(() => {
            const fileName = fileNames[Math.floor(Math.random() * fileNames.length)]

            const textElem = document.createElement('span')
            textElem.style.position = "absolute"
            textElem.style.textAlign = "center"
            textElem.style.marginLeft = "auto"
            textElem.style.marginRight = "auto"
            textElem.style.left = Math.floor(Math.random() * 70) + "vw"
            textElem.style.top = Math.floor(Math.random() * 85) + "vh"
            textElem.style.fontSize = Math.floor(Math.random() * 0.6) + 0.6 + "rem"
            if (["rainbow.heh"].includes(fileName)) {
                textElem.style.backgroundImage = "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)"
                textElem.style.color = "transparent"
                textElem.style.webkitBackgroundClip = "text"
                textElem.style.backgroundClip = "text"
            } else {
                textElem.style.color = "rgba(255, 255, 255, 0.5)"
            }
            textElem.style.fontFamily = "monospace"
            textElem.style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)"
            textElem.style.opacity = "0"
            textElem.style.zIndex = "1"
            textElem.animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: Math.random() * 2000 + 1000,
            })

            textElem.classList.add("text-fade")
            textElem.appendChild(document.createTextNode(fileName))
            document.body.appendChild(textElem)
            setTimeout(() => {
                textElem.remove()
            }, 3000)
        }, Math.random() * 3500)

        // loop
        setTimeout(generate, 5000)
    }

    function delayedGenerate() {
        setTimeout(generate, 1000)
        setTimeout(generate, 1000)
        setTimeout(generate, 1000)
    }

    useEffect(() => {
        delayedGenerate()
    })

    return (
        <Container>
            {children}
            <Stack bottom="2" left="2" position="absolute">
                {isLoggedIn && (
                    <Circle size="60px" bg='white' color="gray.900" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }} cursor="pointer" onClick={() => auth.signOut()}>
                        <Icon as={FaSignInAlt} fontSize="30px" />
                    </Circle>
                )}
                <Text fontSize="sm" color="gray.100" opacity="25%" _hover={{ opacity: "100%", transition: "all 0.1s ease-in-out" }}>
                    made with ❤️ by <Link href="https://github.com/Style77/">yves#4105</Link>
                </Text>
            </Stack>
        </Container>
    )
}