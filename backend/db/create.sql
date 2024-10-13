CREATE TABLE 'User'(
    User_ID     INT             NOT NULL    AUTO_INCREMENT,
    Username    VARCHAR(20)     NOT NULL,
    UserPass    VARCHAR(128)    NOT NULL,
    
    CONSTRAINT UserPK
        PRIMARY KEY(User_ID)
);

CREATE TABLE 'PasswordFolder'(
    Folder_ID   INT             NOT NULL,
    FolderName  VARCHAR(20)     NOT NULL,
    User_ID     INT             NOT NULL,

    CONSTRAINT FolderPK
        PRIMARY KEY(Folder_ID),
    CONSTRAINT UserFK
        FOREIGN KEY(Folder_ID) REFERENCES 'User'(User_ID)
)

CREATE TABLE 'Password'(
    Pass_ID     INT             NOT NULL,
    Folder_ID   INT,
    User_ID     INT             NOT NULL,
    PassHash    VARCHAR(128)    NOT NULL,
    Website     VARCHAR(128)    NOT NULL,
    PassDesc    VARCHAR(128),
    CONSTRAINT PasswordsPK
        PRIMARY KEY(Pass_ID),
    CONSTRAINT FolderFK
        FOREIGN KEY(Folder_ID) REFERENCES 'PasswordFolder'(Folder_ID),
    CONSTRAINT UserFK
        FOREIGN KEY(User_ID) REFERENCES 'User'(User_ID)
    
);