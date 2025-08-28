
const profilePage = () => {
    return (
        <main className="grow">
            profile page
        </main>
    )
}

export default profilePage

/*
بدل م تحط الكلام دا في كل صفخه عايزها تكون محميه عملته في ال middleware file
const locale = (await params).locale;
    const session = await getServerSession();
    if (!session) {
        redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
    }
*/