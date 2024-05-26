const responseSuccess = (res, data) => {
    return res.status(200).json({
        user: data,
    })
}

export { responseSuccess }
