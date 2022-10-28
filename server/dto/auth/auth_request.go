package authdto

type RegisterRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	FullName string `gorm:"type: varchar(255)" json:"fullName" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	Gender   string `gorm:"type:varchar(255)" json:"gender" validate:"required"`
	Phone    string `gorm:"type:varchar(255)" json:"phone" validate:"required"`
	Role     string `gorm:"type:varchar(255)" json:"role" validate:"required"`
}

type LoginRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}

type CheckAuthResponse struct {
	Id    int    `gorm:"type: int" json:"id"`
	Name  string `gorm:"type: varchar(255)" json:"name"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Role  string `gorm:"type: varchar(50)"  json:"role"`
}
