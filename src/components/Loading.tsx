import styles from "@/styles/components/Loading.module.scss"


export const Loading = (props: any) => {
    return (
        <div className={styles.loading} style={{ display: props.isLoading ? 'block' : 'none' }} >
            <div>
                <div className={styles.load}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
