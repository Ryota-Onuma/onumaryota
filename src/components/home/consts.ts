type Skill = {
    categoryName: string,
    children: EachSkill[],
}
type EachSkill = {
    title: string,
    rate: number,
    skillIcon: string,
    description?: string,
}

export const getSkills = () => {
    return skills
}
const skills: Skill[] = [
    {
        categoryName: "Languages・Frameworks・Library",
        children: [
            {
                title: "Ruby",
                rate: 70,
                skillIcon: "mdi:language-ruby",
            },
            {
                title: "Go",
                rate: 60,
                skillIcon: "fa6-brands:golang",
            },
            {
                title: "Python",
                rate: 30,
                skillIcon: "akar-icons:python-fill",
            },
            {
                title: "JavaScript",
                rate: 40,
                skillIcon: "ci:javascript",
            },
            {
                title: "Ruby on Rails",
                rate: 80,
                skillIcon: "cib:rails",
            },
            {
                title: "Hasura",
                rate: 50,
                skillIcon: "simple-icons:hasura",
            },
            {
                title: "Vue.js",
                rate: 40,
                skillIcon: "akar-icons:vue-fill",
            },
            {
                title: "React",
                rate: 10,
                skillIcon: "akar-icons:react-fill",
            },
        ],
    },
    {
        categoryName: "DB・KVS",
        children: [
            {
                title: "PostgreSQL",
                skillIcon: "cib:postgresql",
                rate: 60,
            },
            {
                title: "MySQL",
                skillIcon: "cib:mysql",
                rate: 30,
            },
            {
                title: "Redis",
                skillIcon: "cib:redis",
                rate: 10,
            },
        ],
    },
    {
        categoryName: "Cloud",
        children: [
            {
                title: "AWS",
                skillIcon: "cib:amazon-aws",
                rate: 50,
                description: "ECS, Aurora, EC2, S3 CloudFormation など<br /><br /><br />- AWS認定 -<div><img src='https://res.cloudinary.com/djprqtbkw/image/upload/v1648990871/top/aws-saa_lppyaj.png' /></div>",
            },
            {
                title: "GCP",
                skillIcon: "cib:google-cloud",
                rate: 30,
                description: "Cloud Run, Cloud SQL, Cloud functions など<br /><br /><br />- GCP認定 -",
            },
        ],
    },
    {
        categoryName: "DevOps",
        children: [
            {
                title: "Docker",
                skillIcon: "fa-brands:docker",
                rate: 70,
            },
            {
                title: "Github Actions",
                skillIcon: "akar-icons:github-fill",
                rate: 60,
            },
            {
                title: "Terraform",
                skillIcon: "cib:terraform",
                rate: 50,
            },
        ],
    },
    {
        categoryName: "Others",
        children: [
            {
                title: "GraphQL",
                skillIcon: "akar-icons:graphql-fill",
                rate: 50,
            },
        ],
    },
]
